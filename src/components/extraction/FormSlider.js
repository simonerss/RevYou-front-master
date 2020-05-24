import React, { Component } from 'react';
import AnswerForm from '../../components/extraction/AnswerForm';
import Slider from 'react-slick';
import './slider.css';
// Code sample for Slider arrows https://codesandbox.io/s/91xl6rjvzo

const PrevButton = ({ className, style, onClick }) => (
  <button
    className={['my-class-prev', className].join(' ')}
    style={{ ...style, borderRadius: '50%', backgroundColor: 'black' }}
    onClick={onClick}
    aria-label="Go to previous question"
  />
);
const NextButton = ({ className, style, onClick }) => (
  <button
    className={['my-class-next', className].join(' ')}
    style={{ ...style, borderRadius: '50%', backgroundColor: 'black' }}
    onClick={onClick}
    aria-label="Go to next question"
  />
);

class FormSlider extends Component {
  state = {
    fields: {},
    isLoading: false,
    isSubmitting: false
  };

  componentDidMount() {
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      prevArrow: <PrevButton />,
      nextArrow: <NextButton />
    };
    const {fields} = this.props;
    return (
      <div className="container">
        {fields.length > 0 && (
          <Slider {...settings}>
            {fields.map((field, index) => (
              <div key={index}>
                <AnswerForm key={index} field={field} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    );
  }
}
export default FormSlider;
