import React, { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClickOnBtn = evt => {
    this.setState(prevState => {
      const { name } = evt.target;

      return { [name]: prevState[name] + 1 };
    });
  };

  countTotalFeedback = (good, neutral, bad) => good + neutral + bad;

  countPositiveFeedbackPercentage = (good, neutral, bad) =>
    Math.round((good * 100) / (good + neutral + bad));

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback(good, neutral, bad);
    const PositiveFeedbackPercentage = this.countPositiveFeedbackPercentage(
      good,
      neutral,
      bad
    );

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleClickOnBtn}
          ></FeedbackOptions>
          {Object.values(this.state).some(quantity => quantity > 0) ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={PositiveFeedbackPercentage}
            ></Statistics>
          ) : (
            <Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </>
    );
  }
}
