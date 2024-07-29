import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiData } from "@/data/slides";

interface View {
  id: number;
  asset_name: string;
  asset_type: string;
  fit_to_page: boolean;
  background_color: string;
  opacity: number;
  blur: number;
  text_color: string;
  title: string;
  description: string;
  link: string;
  thumb_url: string;
  image_url: string;
}

interface SxAppData {
  id: string;
  views: View[];
  salesperson_name: string;
  salesperson_email: string;
  client_name: string;
  client_email: string;
  intro_screen_text: string;
  background_color: string;
}

interface SxAppContextProps {
  data: SxAppData | null;
  setData: (data: SxAppData) => void;
}

const SxAppContext = createContext<SxAppContextProps | undefined>(undefined);

export const useSxAppContext = () => {
  const context = useContext(SxAppContext);
  if (!context) {
    throw new Error("useSxAppContext must be used within an SxAppProvider");
  }
  return context;
};

export const SxAppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SxAppData | null>(null);
  useEffect(() => {
    setData(apiData);
  }, [apiData]);
  // Fetch data from backend or initialize here
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/path-to-api");
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

  return (
    <SxAppContext.Provider value={{ data, setData }}>
      {children}
    </SxAppContext.Provider>
  );
};
