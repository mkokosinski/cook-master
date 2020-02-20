import { logOut } from "../../services/auth"

export const signOutHandler = () => {
  const res = logOut();
  console.log(res);
  
    // .then(res => {
    //     console.log('Poprawnie wylogowano');
        
    // })
    // .catch(err => {
    //     console.log('Błąd podczas wylogowywania');
        
    // })
}
