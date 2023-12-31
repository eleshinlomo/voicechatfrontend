"use client"
import { useState } from "react";
import Title from "@/components/Title";
import {RecordMessage} from "@/components/RecordMessage";
import Link from 'next/link'

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  // const data = "This is a fake blob"
  // const blob = new Blob([data], {type: "text/plain"})
  // const url = URL.createObjectURL(blob)
  // console.log(url)

 
  const handleStop = async (mediaBlobUrl: any) => {
    setIsLoading(true);
    console.log(mediaBlobUrl);
  
    // Append recorded message to messages
    const myMessage = { sender: "me", mediaBlobUrl };
    const messagesArr = [...messages, myMessage];
  
    try {
      // Play audio immediately
      // const userAudio = new Audio(mediaBlobUrl)
      // userAudio.play()
  
      // Fetch the content from the URL and convert it to a Blob
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
  
      // Send blob to the server 
      const formData = new FormData();
      formData.append("file", blob, "myFile.wav");
  
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const blobResponse = await fetch(`${BASE_URL}/post-audio`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });
  
      const chatbotData = await blobResponse.blob();
      
      if(!blobResponse.ok){throw new Error("Unable to get Blob response")}
      console.log(chatbotData);
      const chatbotBlob = new Blob([chatbotData], {type: 'audio/wav'})
      const chatbotBlobURL = URL.createObjectURL(chatbotBlob)
      const ChatbotAudio = new Audio(chatbotBlobURL)
      ChatbotAudio.play()
  
      // Create a new message for the chatbot response
      const chatbotMessage = { sender: "rachel", mediaBlobUrl: chatbotBlobURL };
      const updatedMessagesArr = [...messagesArr, chatbotMessage];
  
      setMessages(updatedMessagesArr);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    };
  };
  
  
  
  

  return (
    <div className="h-screen overflow-y-hidden">
      {/* Title */}
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* Conversation */}
        <div className="mt-5 px-5">
          {messages?.map((audio, index) => {
            return (
              <div
                key={index}
                className={
                  "flex flex-col " +
                  (audio.sender == "rachel" && "flex items-end")
                }
              >
                {/* Sender */}
                <div className="mt-4 ">
                  <p
                    className={
                      audio.sender == "rachel"
                        ? "text-right mr-2 italic text-green-500"
                        : "ml-2 italic text-blue-500"
                    }
                  >
                    {audio.sender}
                  </p>

                  {/* Message */}
                  <audio
                    src={audio.mediaBlobUrl}
                    className="appearance-none"
                    controls
                    
                  />
                </div>
              </div>
            );
          })}

          {messages.length == 0 && !isLoading && (
            <div className="text-center font-light italic mt-10">
              Send Rachel a message...
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Gimme a few seconds...
            </div>
          )}
        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-black to-blue-500">
          <div className="flex justify-center items-center w-full">
            <div>
              
              <RecordMessage handleStop={handleStop} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;