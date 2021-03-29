import { OrganizadorInterface } from "./interfaces/organizadorInterface";
import { PessoaInterface } from "./interfaces/pessoaInterface";

declare global{
    namespace Express{
        interface Request{
            organizador?: OrganizadorInterface;
            pessoa?: PessoaInterface;
        }
    }
}