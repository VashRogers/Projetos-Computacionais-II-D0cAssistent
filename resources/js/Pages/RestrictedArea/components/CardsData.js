import { FaRegFileImage } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";

export async function CardsData() {
    return [
        {
            title: "PDFs",
            icon: VscFilePdf,
            url: "restricted-area/pdf-store",
            desc: "Armazenamento de PDFs",
        },
        {
            title: "IMAGENS",
            icon: FaRegFileImage,
            url: "",
            desc: "Armazenamento de imagens",
        },
        {
            title: "ANOTAÇÕES",
            icon: IoDocumentText,
            url: "",
            desc: "Anotações em geral",
        },
    ];
}
