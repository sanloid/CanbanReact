import { CardProps } from "./CardType";

export interface ColumnProps{
    name : string;
    id : string;
    author : string;
    cards ?: CardProps[];
}