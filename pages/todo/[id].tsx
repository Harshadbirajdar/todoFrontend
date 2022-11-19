import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Todo } from "..";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { addTask, deleteTask, getTodoById } from "../../service/todo";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const Todo = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      task: "",
    },
  });
  const [data, setData] = useState<Todo>({ tasks: [], title: "", _id: "" });
  const { id } = router.query;
  useEffect(() => {
    id && getTodo();
  }, [id]);

  const getTodo = () => {
    getTodoById(id).then((response) => {
      if (response.data.success) setData(response.data.data);
    });
  };

  const onAddClick = (data: { task: string }) => {
    addTask(id, data.task).then((response) => {
      toast.success(response.data.message);
      getTodo();
      reset();
    });
  };

  const onDeleteClick = (task: string) => {
    const result = confirm("Are you sure to delete Task");
    if (!result) return;
    deleteTask(id, task).then((response) => {
      const { data } = response;
      if (data.success) {
        toast.success(data.message);
        getTodo();
      }
    });
  };
  return (
    <div>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Todo app by Harshad Birajdar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center min-h-screen  bg-[#cbd7e3]">
        <div className="h-[80vh]  w-96 bg-white rounded-lg px-6 py-10">
          <div className="flex items-center">
            <svg
              onClick={() => {
                router.push("/");
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>

            <p className="text-xl font-semibold ml-3 text-[#063c76]">
              {data.title}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <Input
              {...register("task", {
                required: {
                  value: true,
                  message: "Please enter a task",
                },
              })}
              error={errors.task?.message}
              wrapperClass=" w-[87%]"
              label="Add New Task"
            />
            <Button
              className="w-auto !p-2 rounded-full "
              onClick={handleSubmit(onAddClick)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
          <div className="w-full mt-4 flex text-sm flex-col text-center justify-center "></div>
          <ul className="my-4 h-[80%] overflow-y-scroll">
            <li className=" mt-4">
              {data.tasks?.map((todo, index) => (
                <div
                  key={index}
                  className=" h-12 mb-2 bg-[#e0ebff] rounded-[7px] flex justify-between items-center px-3"
                >
                  {todo}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClick(todo);
                    }}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
