import { IForm } from "./StepsForm";

interface TableItemProps {
  item: IForm;
  remove: (date: string) => void;
  edit: (item: IForm) => void;
}

export const TableItem = ({ item, remove, edit }: TableItemProps ) => {
  const { date, km } = item;

  return (
    <tr className="table-row">
      <td>{date}</td>
      <td>{km}</td>
      <td className="material-icons" onClick={() => edit(item)}>edit</td>
      <td className="material-icons" onClick={() => remove(item.date)}>close</td>
    </tr>
  )
}
