import React, {
  createContext,
  useContext,
  useRef,
  MutableRefObject,
  ReactNode,
  useState,
} from "react";

interface SliderContextProps {
  mainSliderRef: MutableRefObject<Slider | null>;
  thumbSliderRef: MutableRefObject<Slider | null>;
  activeSlide: number;
  prevSlide: number;
  setActiveSlide: (index: number) => void;
  setPrevSlide: (index: number) => void;
}

const SliderContext = createContext<SliderContextProps | undefined>(undefined);

interface SliderProviderProps {
  children: ReactNode;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({ children }) => {
  const mainSliderRef = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  // console.log("mainSliderRef", mainSliderRef);
  // console.log("thumbSliderRef", thumbSliderRef);
  // console.log("activeSlide", activeSlide);
  // console.log("setActiveSlide", setActiveSlide);

  return (
    <SliderContext.Provider
      value={{
        mainSliderRef,
        thumbSliderRef,
        activeSlide,
        setActiveSlide,
        prevSlide,
        setPrevSlide,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = (): SliderContextProps => {
  const context = useContext(SliderContext);
  if (context === undefined) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};
