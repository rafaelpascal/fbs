import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CommentCard from "~/components/cards/CommentCard";
import { Avatar } from "~/components/dashboard/Avatar";
import { BaseInput } from "~/components/data-inputs/text-input";
import { useTheme } from "~/context/theme-provider";
import { DashboardArea } from "~/layouts/DashboardArea";
import { getSlideAnimation } from "~/lib/utils";
import { cn } from "~/utils/helpers";
import { motion } from "framer-motion";

const SingleConversation = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isReply, setIsReply] = useState(false);
  const [formData, setFormData] = useState({ question: "" });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardArea>
      <div className="p-4 space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-md p-2 flex justify-between items-center gap-2 shadow-md bg-[#FF2222B2]"
        >
          <IoArrowBackOutline className="text-white size-6" />
          <p className="text-white font-DMSans font-semibold ">Back</p>
        </button>
        <div className="flex items-start gap-4">
          <Avatar
            img=""
            name="Uchenna Joe"
            avatarClassName="md:h-20 h-10 w-10 md:w-20 bg-[#336CFB] rounded-full"
            textClassName="font-medium text-white text-sm"
            wrapperClassName="max-md:gap-0"
            color={"#fff"}
          />
          <div className="flex-1">
            <div className="">
              <h4 className="font-semibold font-DMSans text-[#336CFB]">
                Uchenna Joe
              </h4>
              <p className="text-sm font-DMSans font-semibold italic">
                5 April at 12:45
              </p>
            </div>
            <p className="font-medium font-DMSans text-lg lg:text-2xl mt-1">
              Foreign business and growth before the business...
            </p>
            <p className="text-xs font-DMSans font-semibold italic mt-1">
              25 minutes ago • 3 Replies • 56 Likes • 506 Views
            </p>
          </div>
        </div>

        <img
          src="https://s3-alpha-sig.figma.com/img/23e5/5f76/73610754357c871896e53d2f4ee92729?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RXIig~S7nKLaBy1FH4GAa7qWm9ks2GxVoqA9MBDjLMbeiHAgchZMG9HbPTj3~ObWKtXxcrCGb~bNjS5inJiRcE4TuKkDW0KWu8asgOG6b1mHbZM0DSnN6mncUvjlOxSvu~FRuZy7h6rpRZ2pXYtpOqBAsvWreE1NTS~NdqU5Oo6LUiSGjNwEghfF-6kndXOgwnvbXVrldFZfQ9h4jGfMTgsC7KaK~psmitlSSYnBLaFOwM9o92i4vYFqost9Pm3Iy3LiSQ8e5-jC6fuCCFjKOOFOlo1umRSYkpol2DrUH4SIJso9bVRc86xaW99YIF28tptopwrDIZ5ZQNOcFQ0BeQ__"
          alt="post"
          className="rounded-md object-cover w-full lg:w-[281.02px] max-h-60"
        />

        <p className="font-DMSans font-normal text-left text-lg w-full">
          I think Promoting campaigns with discriminatory undertones or
          targeting marginalized communities raises ethical concerns and
          contradicts principles of equality, diversity, and human rights.
          Instead, let me reframe your request into positive, inclusive, and
          culturally sensitive public relations capstone projects that address
          social or cultural values constructively. But what can I say? What if
          it doesn’t go as planned? What do you think?
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          <button className="font-DMSans font-semibold text-left text-sm lg:text-lg">
            Like
          </button>
          <button
            onClick={() => setIsReply(!isReply)}
            className={cn(
              "font-DMSans font-semibold text-left text-sm lg:text-lg",
              isReply && "text-red-500"
            )}
          >
            {isReply ? "Cancel" : "Reply"}
          </button>
          <button className="font-DMSans font-semibold text-left text-sm lg:text-lg">
            Edit
          </button>
          <button className="font-DMSans font-semibold text-left text-sm lg:text-lg">
            Delete
          </button>
          <button className="ml-auto text-blue-500 font-DMSans font-semibold text-left text-sm lg:text-lg">
            Copy link
          </button>
          <button className="text-red-500 font-DMSans font-semibold text-left text-sm lg:text-lg">
            Report
          </button>
        </div>

        {isReply && (
          <motion.div
            {...getSlideAnimation({ slideDirection: "right" })}
            transition={{ duration: 0.5 }}
          >
            <BaseInput
              label="Add Reply"
              type="textarea"
              placeholder="Type Reply"
              containerClassname="w-full"
              labelClassName="text-[17px] font-DMSans font-semibold"
              inputContainerClassName={cn(
                "h-[153px] py-2 shadow-lg",
                theme === "dark"
                  ? "select-secondary"
                  : "border-[0.5px] border-[#ddd]"
              )}
              value={formData.question}
              onChange={(e: any) =>
                handleInputChange("question", e.target.value)
              }
            />
          </motion.div>
        )}

        {/* Comments/Replies */}
        <div className="mt-4 w-full space-y-4">
          <CommentCard
            author="Joseph James"
            replyTo="Uchenna Joe"
            content="Instagram: For visually appealing products and younger audiences..."
          />
          <CommentCard
            author="Uchenna Joe"
            replyTo="Joseph James"
            content="Thanks for the breakdown — great points!"
          />
          <CommentCard
            author="Hope Martina"
            replyTo="Uchenna Joe"
            content="Very insightful. I agree about the cultural aspect."
          />
        </div>
      </div>
    </DashboardArea>
  );
};

export default SingleConversation;
