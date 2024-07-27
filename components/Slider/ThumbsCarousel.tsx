import React from "react";
import Slider from "react-slick";
import 
interface Item {
  link: string;
}

interface CarouselProps {
  items: Item[];
}

interface CarouselState {
  clientXonMouseDown: number | null;
  clientYonMouseDown: number | null;
}

class ThumbsCarousel extends React.Component<CarouselProps, CarouselState> {
  settings: any;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      clientXonMouseDown: null,
      clientYonMouseDown: null,
    };
    this.settings = {
      dots: true,
      arrows: false,
      swipeToSlide: true,
      infinite: false,
      // Add other slider settings here
    };

    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnMouseDown(e: React.MouseEvent<HTMLAnchorElement>) {
    this.setState({
      clientXonMouseDown: e.clientX,
      clientYonMouseDown: e.clientY,
    });
    e.preventDefault(); // Stops weird link dragging effect
  }

  handleOnClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
    if (
      this.state.clientXonMouseDown !== e.clientX ||
      this.state.clientYonMouseDown !== e.clientY
    ) {
      // Prevent link click if the element was dragged
      e.preventDefault();
    }
  }

  render() {
    const { items } = this.props;
    return (
      <Slider {...this.settings}>
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseDown={this.handleOnMouseDown}
            onClick={this.handleOnClick}
          >
            Link innerText
          </a>
        ))}
      </Slider>
    );
  }
}

export default ThumbsCarousel;
