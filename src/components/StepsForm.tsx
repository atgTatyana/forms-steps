import { useState } from "react"
import { TableItem } from "./TableItem";

export interface IForm {
  date: string,
  km: number | string,
}

export const StepsForm = () => {
  const [form, setForm] = useState<IForm>({
    date: "",
    km: "",
  })

  const [formArray, setFormArray] = useState<IForm[]>([]);

  const handleRemove = (date: string) => {
    setFormArray(prev => prev.filter(item => item.date !== date))
    console.log(date, formArray)
  }

  const handleEdit = (item: IForm) => {
    setForm({
      date: item.date,
      km: item.km,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {date} = form;
    if (date.length === 8) {
      form.date = date =  date.slice(0,6) + "20" + date.slice(6);
    }

    function compare(a: string, b: string) {
      const a1 = new Date(Number(a.slice(6)), Number(a.slice(3,5)) - 1, Number(a.slice(0,2)));
      const b1 = new Date(Number(b.slice(6)), Number(b.slice(3,5)) - 1, Number(b.slice(0,2)));
      return b1 - a1;
    }

    const index = formArray.findIndex(form => form.date === date);
    if (index !== -1) {
      formArray[index].km = Number(formArray[index].km) + Number(form.km);
    } else {
      formArray.push(form);
      formArray.sort((a: IForm, b: IForm) => compare(a.date, b.date));
    }

    console.log(formArray);
    setForm({
      date: "",
      km: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm, 
      [name]: value,
    }))
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input id="date" type="text" name="date" value={form.date} onChange={handleChange}/>
        </div>
        <div className="form-item">
          <label htmlFor="km">Пройдено км</label>
          <input id="km" type="text" name="km" value={form.km} onChange={handleChange} />
        </div>
        <div className="form-item">
          <button className="form-button" type="submit" >OK</button>
        </div>
      </form>
      <div className="table-title">
          <span>Дата (ДД.ММ.ГГ)</span>
          <span>Пройдено км</span>
          <span>Действия</span>
      </div>
      <table>
        <tbody className="table-body">
          {formArray.map((item) => (
            <TableItem key={crypto.randomUUID()} item={item}
              remove={handleRemove} edit={handleEdit} />
          ))}
        </tbody>
      </table>
    </>  
  )
}
