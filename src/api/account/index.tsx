import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { AccountDetailDto, AccountsModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getAccounts = async (jwt: string): Promise<AccountsModel[]> => {
  const response = await fetch(`${BASE_URL_AUTH}/api/account/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
      transaction_id: uuidv4(),
    },
  });

  const responseData = await response.json();

  if (response.ok && response.status === 200) {
    return responseData.data;
  } else if (response.status == 404 || response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};

export const getAccount = async (
  jwt: string,
  account_id: string
): Promise<AccountDetailDto> => {
  const response = await fetch(`${BASE_URL_AUTH}/api/account/${account_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
      transaction_id: uuidv4(),
    },
  });

  const responseData = await response.json();

  if (response.ok && response.status === 200) {
    return responseData.data;
  } else if (response.status == 404 || response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};
