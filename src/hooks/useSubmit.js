import { useCallback } from "react";

export default function useSubmitHandler(callback, inputValue) {
    return useCallback(e => {
      e.preventDefault();
      if (!inputValue) {
        alert ('請輸入代辦事項名稱');
      }else{
        callback();
      }
    });
}