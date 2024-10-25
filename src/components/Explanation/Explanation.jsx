import { useNavigate } from "react-router-dom";
import { Container } from "../Container/Container";

const Explanation = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="ml-2 mr-10">
        <div className="flex flex-col items-center ml-10 bg-white rounded-xl w-full max-w-7xl h-full overflow-y-auto overflow-x-auto">
          <div className="w-full px-9">
            <div className="border-2 border-pale-purple my-10 rounded-xl">
              <div className="flex justify-between items-center mt-10 mx-10 ">
                <p className="text-dark-blue text-2xl font-extrabold">
                  Welcome to GigsHub! 🎉
                </p>
              </div>
              <div className="flex justify-between items-center my-10 mx-10 ">
                <p>
                  We're thrilled to have you onboard as you take a big step
                  toward landing interviews faster with a little help from AI.
                  Our mission is all about empowering job seekers like you to
                  stand out and get noticed, making the job hunt smoother and
                  quicker. Ready to get started? Add a few details to build your
                  profile, and let's get you closer to your next big
                  opportunity!
                </p>
              </div>
              <div className="flex justify-center my-10 mx-auto">
                <button className="flex items-center justify-center h-input py-6 px-1 rounded-3xl border-2 border-pale-purple mt-6 lg:mt-0 lg:-mb-5 ml-0 xl:ml-[400px]">
                  <div className="flex items-center justify-center w-40 h-input bg-dark-blue rounded-2xl border-5">
                    <span
                      className="text-sm text-white font-thin py-6"
                      onClick={() => navigate("/settings")}
                    >
                      Get started
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Explanation;
