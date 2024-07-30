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
  opacity: string | number;
  blur: number;
  text_color: string;
  title: string;
  description: string;
  link: string;
  link_text: string;
  link_color: string;
  thumb_url: string;
  image_url: string | Array<String> | null;
  video_url: string | Array<String> | null;
}

interface SxAppData {
  id: string;
  views: View[];
  salesperson_name: string;
  salesperson_email: string;
  client_name: string;
  client_email: string;
  intro_screen_text: string;
}

interface SxAppContextProps {
  data: SxAppData | null;
  setData: (data: SxAppData) => void;
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
}

const SxAppContext = createContext<SxAppContextProps | undefined>(undefined);

export const SxAppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<SxAppData | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    setData(apiData);
  }, [apiData]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "https://reals.simplex3d.com/api/real/sgasdgsadgasdg/"
  //     );
  //     const result = await response.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

  return (
    <SxAppContext.Provider
      value={{ data, setData, isFullScreen, setIsFullScreen }}
    >
      {children}
    </SxAppContext.Provider>
  );
};

export const useSxAppContext = () => {
  const context = useContext(SxAppContext);
  if (!context) {
    throw new Error("useSxAppContext must be used within an SxAppProvider");
  }
  return context;
};
