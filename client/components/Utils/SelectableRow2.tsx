import React, { useState } from "react";
import "./styles.css";

export default function App() {
  return <Mails />;
}

const Mails = () => {
  const mails = [
    {
      id: 0,
      from: "John Doe",
      subject: "Subject",
      data: new Date()
    },
    {
      id: 1,
      from: "John Doe",
      subject: "Subject",
      data: new Date()
    },
    {
      id: 2,
      from: "John Doe",
      subject: "Subject",
      data: new Date()
    }
  ];

  const [active, setActive] = useState();

  const setActiveRow = (id: any) => {
    setActive(id);
  };

  return (
    <table>
      <tbody>
        {mails.map((m: any, index: any) => (
          <MailSummary
            key={index}
            {...m}
            active={active === m.id}
            onClick={() => {
              setActiveRow(m.id);
            }}
          />
        ))}
      </tbody>
    </table>
  );
};

const MailSummary = ({ id, from, subject, date, active, onClick }: any) => {
  return (
    <tr onClick={onClick} className={`${active ? "active" : "not-active"}`}>
      <td>{from}</td>
      <td>{subject}</td>
      <td>{date}</td>
      <td>{active.toString()}</td>
    </tr>
  );
};