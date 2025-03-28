import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import { useApolloClient } from '@apollo/client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Message } from '@/types/chat';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

 function Home() {
  const [query, setQuery] = useState<string>('');
  type Message = {
    type: 'userMessage' | 'apiMessage';
    message: string;
    response?: string; 
    sourceDocs?: Document[];
  };
  
  // Update the state initialization
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Hi, what would you like to learn about this document?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const apolloClient = useApolloClient();

  const ASK_QUESTION_QUERY = gql`
    query AskQuestion($question: String!) {
      askQuestion(question: $question)
    }
  `;
  const GET_CHAT_HISTORY_QUERY = gql`
  query GetChatHistory {
    getMessages {
      question
      response
    }
  }
`;

const { loading: historyLoading, data: historyData } = useQuery(GET_CHAT_HISTORY_QUERY);


const updateChatHistory = () => {
  if (historyData && historyData.getMessages) {
    const chatHistory = historyData.getMessages.map((msg: { question: string; response: string }) => ({
      type: 'userMessage',
      message: msg.question,
      response: msg.response,
    }));

    setMessageState((state) => ({
      ...state,
      messages: [...state.messages, ...chatHistory],
    }));
  }
};


useEffect(() => {
  updateChatHistory();
}, [historyData]);
  
  const [formSubmited,setFormSubmited]=useState(false)
  const {  error,loading,data } = useQuery(ASK_QUESTION_QUERY, {
    variables: { question:query },
    skip:!formSubmited
  });

  // Utilisez handleAskQuestion dans votre gestionnaire de soumission de formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!query) {
      alert('Veuillez saisir une question');
      return;
    }
    setFormSubmited(true); 

    try {
      const question = query.trim();
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'userMessage',
            message: question,
          },
        ],
      }));
  
      
      // Make the API call here
      const { data } = await apolloClient.query({
        query: ASK_QUESTION_QUERY,
        variables: { question },
      });
      
      if (data && data.askQuestion) {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.askQuestion,
            },
          ],
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setFormSubmited(false); 
    }
    
  };
 

 const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit(e);
  }
};

  
useEffect(() => {
  if (messageListRef.current) {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }
}, [messages]);

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
            Chat With Your Docs
          </h1>
          <main className={styles.main}>
            <div className={styles.cloud}>
            <div ref={messageListRef} className={styles.messagelist} style={{ flexDirection: 'column-reverse' }}>
              {messages.map((message, index) => {
                let icon;
                let className;
                
                if (message.type === 'apiMessage') {
                  icon = (
                    <Image
                      key={index}
                      src="/bot-image.png"
                      alt="AI"
                      width="40"
                      height="40"
                      className={styles.boticon}
                      priority
                    />
                  );
                  className = styles.apimessage;
                } else {
                  icon = (
                    <Image
                      key={index}
                      src="/usericon.png"
                      alt="Me"
                      width="30"
                      height="30"
                      className={styles.usericon}
                      priority
                    />
                  );
                  // The latest message sent by the user will be animated while waiting for a response
                  className =
                    loading && index === messages.length - 1
                      ? styles.usermessagewaiting
                      : styles.usermessage;
                }

                return (
                  <div key={`chatMessage-${index}`} className={className}>
                    {icon}
                    <div className={styles.markdownanswer}>
                      {/* Display the user's question */}
                      <div className={styles.userQuestion}>
                        <ReactMarkdown linkTarget="_blank">
                          {message.message}
                        </ReactMarkdown>
                      </div>
                      {/* Display the AI's response if it exists */}
                      {message.type === 'userMessage' && message.response && (
                        <div className={styles.botAnswer}>
                          <ReactMarkdown linkTarget="_blank">
                            {message.response}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {message.sourceDocs && (
                      <div className="p-5" key={`sourceDocsAccordion-${index}`}>
                        <Accordion type="single" collapsible className="flex-col">
                          {message.sourceDocs.map((doc, index) => (
                            <div key={`messageSourceDocs-${index}`}>
                              <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger>
                                  <h3>Source {index + 1}</h3>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ReactMarkdown linkTarget="_blank">
                                    {doc.pageContent}
                                  </ReactMarkdown>
                                  <p className="mt-2">
                                    <b>Source:</b> {doc.metadata.source}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            </div>
                          ))}
                        </Accordion>
                      </div>
                    )}
                  </div>
                );
              })}

              </div>
            </div>
            <div className={styles.center}>
              <div className={styles.cloudform}>
                <form onSubmit={handleSubmit}>
                  <textarea
                    disabled={loading}
                    onKeyDown={handleEnter}
                    ref={textAreaRef}
                    autoFocus={false}
                    rows={1}
                    maxLength={512}
                    id="userInput"
                    name="userInput"
                    placeholder={
                      loading
                        ? 'Waiting for response...'
                        : 'What is this legal case about?'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.textarea}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.generatebutton}
                  >
                    {loading ? (
                      <div className={styles.loadingwheel}>
                        <LoadingDots color="#000" />
                      </div>
                    ) : (
                      // Send icon SVG in input field
                      <svg
                        viewBox="0 0 20 20"
                        className={styles.svgicon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </div>
            {error && (
              <div className="border border-red-400 rounded-md p-4">
                <p className="text-red-500">{error.message}</p>
              </div>
            )}
          </main>
        </div>
        <footer className="m-auto p-4">
          <a href="https://twitter.com/mayowaoshin">
            Powered by LangChainAI. 
          </a>
        </footer>
      </Layout>
    </>
  );
}

export default Home;
