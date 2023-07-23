import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ActionCableContext = createContext();

const ActionCableProvider = ({ children }) => {
  const { data: session } = useSession();
  const [cableApp, setCableApp] = useState({ cable: null });

  const loadConsumer = async () => {
    const { createConsumer } = await import("@rails/actioncable");
    return createConsumer(`${process.env.NEXT_PUBLIC_API_WS_URL}/cable`);
  };

  useEffect(() => {
    const fetchConsumer = async () => {
      if (
        typeof window !== "undefined" &&
        session?.user &&
        cableApp.cable === null
      ) {
        const consumer = await loadConsumer();
        setCableApp({ cable: consumer });
        // loadConsumer().then((createConsumer) => {
        //   setCableApp({
        //     // cable: createConsumer(`${process.env.NEXT_PUBLIC_API_WS_URL}/cable`),
        //   });
      }
    };
    fetchConsumer();
  }, [session]);

  return (
    <ActionCableContext.Provider value={{ cable: cableApp.cable }}>
      {children}
    </ActionCableContext.Provider>
  );
};

export { ActionCableContext, ActionCableProvider };
