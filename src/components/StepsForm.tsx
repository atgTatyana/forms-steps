import { useState } from "react"
import { TableItem } from "./TableItem";

export interface IForm {
  date: string,
  km: number,
}

export const StepsForm = () => {
  const [form, setForm] = useState<IForm>({
    date: "",
    km: 0,
  })

  const [formArray, setFormArray] = useState<IForm[]>([]);

  const handleRemove = (date: string) => {
    setFormArray(prev => prev.filter(item => item.date !== date))
  }

  const handleEdit = (item: IForm) => {
    setForm({
      date: item.date.replace(/(\d{2}).(\d{2}).(\d{2})/, '20$3-$2-$1'),
      km: item.km,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.date = form.date.replace(/20(\d{2})-(\d{2})-(\d{2})/, '$3.$2.$1');

    const isDate = formArray.find(item => item.date === form.date);
    if (isDate) {
      setFormArray(prev => prev.map(item => item.date === form.date ?
        {date: form.date, km: Number(item.km) + Number(form.km)} : item))
    } else {
      setFormArray([...formArray, form]);
      setFormArray(prev => prev.sort((a: IForm, b: IForm) =>
        new Date(a.date.replace(/^(\d{2}).(\d{2})/, '$2.$1')).getTime() < 
        new Date(b.date.replace(/^(\d{2}).(\d{2})/, '$2.$1')).getTime() ? 1 : -1));
    }

    console.log(formArray);
    setForm({
      date: "",
      km: 0,
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
          <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
          <input id="date" type="date" name="date" value={form.date} onChange={handleChange}/>
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
