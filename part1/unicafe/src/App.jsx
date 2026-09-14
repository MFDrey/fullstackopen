import { useState } from 'react';

const Header = () => {
  return (
    <h1>give feedback</h1>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  );
};

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total == 0) {
    return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text='good' />
            </td>
            <td>
              <StatisticLine value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='neutral' />
            </td>
            <td>
              <StatisticLine value={neutral} />
              </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='bad' />
            </td>
            <td>
              <StatisticLine value={bad} />
              </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='all' />
            </td>
            <td>
              <StatisticLine value={total} />
              </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='average' />
            </td>
            <td>
              <StatisticLine value={average} />
              </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text='positive' />
            </td>
            <td>
              <StatisticLine value={positive} />
              </td>
          </tr>
        </tbody>

      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad
  const average = total/3
  const positive = <>{good/total*100} %</>

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  );
};

export default App;