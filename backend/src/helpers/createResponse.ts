export default function CreateRes(
  status: boolean,
  message: string,
  data?: any
) {
  return {
    status: status ? "success" : "error",
    message,
    data,
  };
}
