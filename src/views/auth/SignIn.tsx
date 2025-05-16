import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsMicrosoft } from "react-icons/bs";
import { useAuth } from "context/AuthProvider";

export default function SignIn() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\+?\d{10,15}$/, "Número inválido. Debe tener entre 10 y 15 dígitos.")
        .required("El número de celular es obligatorio."),
    }),
    onSubmit: async (values) => {
      await login({ phone: values.phone }, "github");
    },
  });

  const handleGitHubLogin = () => {
    if (!formik.values.phone) {
      formik.setTouched({ phone: true });
      return;
    }
    formik.handleSubmit();
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Iniciar Sesión</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">¡Usa uno de nuestros proveedores para iniciar sesión!</p>

        <button onClick={() => login({}, "google")} className="mb-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800">
          <FcGoogle className="text-xl" />
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">Iniciar sesión con Google</h5>
        </button>

        <button onClick={() => login({}, "microsoft")} className="mb-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800">
          <BsMicrosoft className="text-xl" />
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">Iniciar sesión con Microsoft</h5>
        </button>

        <button onClick={handleGitHubLogin} className="mb-5 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary dark:bg-navy-800">
          <BsGithub className="text-xl" />
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">Iniciar sesión con GitHub</h5>
        </button>

        <label className="block text-sm font-medium text-gray-700 dark:text-white">Número de celular para GitHub</label>
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Ingresa tu celular"
          className={`w-full p-2 border rounded-md ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"}`}
        />
        {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>}
      </div>
    </div>
  );
}