import ptBR from "../translation/routes/pt-br.json";
import { useUserContext } from "./useUserContext";

export const usePathRoutes = () => {
    const { url } = useUserContext();
    const pathname = url;

    const translate = (path) => ptBR[path] || path;

    const paths = pathname.split("/").filter((path) => path);

    return {
        paths,
        translate,
    };
};
