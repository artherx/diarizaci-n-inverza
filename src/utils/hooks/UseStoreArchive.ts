import { create } from "zustand";
interface StoreArchive {
    file: File ;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearFile: () => void;
}
const emptyFile = new File([""], "empty.txt");
export const UseStoreArchive = create<StoreArchive>((set) => ({
    file: emptyFile,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        set({ file });
    },
    clearFile: () => {
        set({ file: emptyFile });
    },
}
))