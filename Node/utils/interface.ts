type templateType = Record<number, ItemType[]>;

interface BillItem {
  date: number;
  value: number;
  msg: string;
}

interface ItemType {
  mouth: number;
  value: number;
  pay: BillItem[];
  income: BillItem[];
  history: Exclude<BillItem, "date">[];
}

// const template: templateType = {
//   23: [
//     {
//       mouth: 1,
//       value: 0,
//       pay: [
//         {
//           value: 1,
//         },
//       ],
//       income: [],
//       history: [],
//     },
//   ],
// };
