import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ActionCableContext = createContext();

const ActionCableProvider = ({ children }) => {
  const { data: session } = useSession();
  const [cableApp, setCableApp] = useState({ cable: null });

  const loadConsumer = async () => {
    const { createConsumer } = await import("@rails/actioncable");
    return createConsumer;
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      session?.user &&
      cableApp.cable === undefined
    ) {
      loadConsumer().then((createConsumer) => {
        setCableApp({
          cable: createConsumer(`${process.env.NEXT_PUBLIC_API_WS_URL}/cable`),
        });
      });
    }
  }, [session]);

  return (
    <ActionCableContext.Provider value={cableApp.cable}>
      {children}
    </ActionCableContext.Provider>
  );
};

export { ActionCableContext, ActionCableProvider };
