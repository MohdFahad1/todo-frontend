import { Input } from "@/components/ui/input";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold">Get Started Today</h1>
          <p className="text-lg text-gray-500 w-[530px] my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <label>Name</label>
            <Input className="mt-2" placeholder="Enter your name" type="text" />
          </div>
          <div>
            <label>Email</label>
            <Input
              className="mt-2"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              className="mt-2"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          {/* <Button>Register</Button> */}
        </div>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
