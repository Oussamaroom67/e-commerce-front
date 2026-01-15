import { ToastType } from "../enums/toast-types";
export interface ToastOptions {
message:string;
type?:ToastType;
duration?:number;
}