import { useState } from "react";

interface DropDownProps {
  title: string;
  data: string[];
  state: any;
  setState: (newState: any) => void;
}

export function DropDown(props: DropDownProps) {
  const [open, setOpen] = useState<boolean>(false);

  function handleCheckboxClick(id: string) {
    console.log(props.state);
    props.setState((prevState: string[]) => {
      if(prevState.includes(id)) {
        return prevState.filter(selectedOption => selectedOption !== id);
      } else {
        return [...prevState, id];
      }
    })
  }

  return (
    <div className="drop-down">
      <div onClick={() => setOpen(prev => !prev)} className={`drop-down__title ${open ? 'open' : ''}`}>
        <p className="drop-down__title--text">{props.title}</p>

        <button className={`drop-down__title--drop-btn ${open ? 'open' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>

      <div className={`drop-down__options ${open ? 'open' : ''}`}>
        <ul className="drop-down__options--list">
          {props.data.map(option => (
            <li key={`${props.title}-${option}`} className="drop-down__options--list__item">
              <input checked={props.state.includes(option)} onChange={() => handleCheckboxClick(option)} name={props.title} id={option} type="checkbox" className="drop-down__options--list__item--checkbox" />
              <label htmlFor={option} className="drop-down__options--list__item--label">{option.split('-').join(' ')}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
