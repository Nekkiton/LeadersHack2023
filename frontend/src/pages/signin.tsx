import axios from "axios"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

type ICreateUserData = {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit: onSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<ICreateUserData>();

  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log(data);
    signIn(data);
  }

  const signIn = async ({ email, password }: any) => {
    return axios
      .post("/api/v1/auth/signIn", {
        username: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        router.push("/")
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={onSubmit(handleSubmit)}
        className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none"
      >
        <p className="place-self-start font-semibold text-base text-[#5473E3]">
          Login to the system
        </p>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className={
            errors.email
              ? "block peer rounded-[5px] w-[25rem]  mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
              : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
          }
        />
        <span className="place-self-start text-[14px] text-[#C93B32]">
          {errors.email?.message}
        </span>

        <input
          {...register("password")}
          type="password"
          placeholder="Senha"
          className={
            errors.password
              ? "block peer rounded-[5px] w-[25rem] mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]"
              : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] mt-5 focus:outline-none focus:ring-1"
          }
        />
        <span className="place-self-start text-[14px] text-[#C93B32]">
          {errors.password?.message}
        </span>

        <button
          type="submit"
          className={`rounded-full bg-[#3D5FD9] text-[#F5F7FF] w-[25rem] p-3 mt-5 hover:bg-[#2347C5] mb-5`}
        >
          SIGN IN
        </button>
      </form>
    </div>
  )
}
