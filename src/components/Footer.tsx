import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import CTR from "./CTR";
import { integralCF } from "@/app/fonts/fonts";

const paymentImg = [
  {
    src: "/footer/image1.png",
  },
  {
    src: "/footer/image2.png",
  },
  {
    src: "/footer/image3.png",
  },
  {
    src: "/footer/image4.png",
  },
  {
    src: "/footer/image5.png",
  },
];

const SocialLinks = [
  {
    icon: <BsTwitter />,
    link: "/",
  },
  {
    id: "a",
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/abdulsamad.siddiqui.1048",
  },
  {
    icon: <BsInstagram />,
    link: "https://www.instagram.com/abdul_samad_siddiqui_9/",
  },
  {
    icon: <BsGithub />,
    link: "https://github.com/AbdulSamad94",
  },
];

const otherLinks = [
  {
    company: ["About", "Features", "Works", "Career"],
    help: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
    faq: ["Accounts", "Manage Deliveries", "Orders", "Payments"],
    resources: [
      "Free eBooks",
      "Deployment Tutorials",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
];
const Footer = () => {
  return (
    <main className="relative">
      <div className="bg-slate-100 absolute w-full top-32 h-[200px] -z-10"></div>
      <CTR />
      <section className="lg:px-12 px-2 bg-slate-100 py-20 -z-10">
        <div className="flex lg:justify-between lg:flex-row flex-col gap-10 mx-auto">
          <div className="lg:w-[20%]">
            <h1
              className={`text-[38px] font-bold tracking-wide mb-4 ${integralCF.className}`}
            >
              SHOP.CO
            </h1>
            <p className="text-slate-600 text-[14px] mb-8">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex items-center gap-x-4">
              {SocialLinks.map((items, index) => (
                <Link
                  href={items.link}
                  target="_blank"
                  className={`${
                    items.id
                      ? "bg-black text-white hover:bg-black"
                      : "bg-white hover:bg-slate-100 duration-200"
                  } w-[38px] h-[38px] rounded-full border border-slate-300 flex justify-center items-center`}
                  key={index}
                >
                  {items.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-x-2 lg:w-[65%]">
            <div className="w-full text-[16px]">
              <h1 className="uppercase tracking-widest font-medium mb-5">
                Company
              </h1>
              <div className="flex flex-col gap-y-5 text-slate-500">
                {otherLinks[0].company.map((link, index) => (
                  <p className="hover:underline cursor-pointer" key={index}>
                    {link}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full text-[16px]">
              <h1 className="uppercase tracking-widest font-medium mb-5">
                Help
              </h1>
              <div className="flex flex-col gap-y-5 text-slate-500">
                {otherLinks[0].help.map((link, index) => (
                  <p className="hover:underline cursor-pointer" key={index}>
                    {link}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full text-[16px]">
              <h1 className="uppercase tracking-widest font-medium mb-5">
                FAQ
              </h1>
              <div className="flex flex-col gap-y-5 text-slate-500">
                {otherLinks[0].faq.map((link, index) => (
                  <p className="hover:underline cursor-pointer" key={index}>
                    {link}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-full text-[16px]">
              <h1 className="uppercase tracking-widest font-medium mb-5">
                Resources
              </h1>
              <div className="flex flex-col gap-y-5 text-slate-500">
                {otherLinks[0].resources.map((link, index) => (
                  <p className="hover:underline cursor-pointer" key={index}>
                    {link}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-300 h-[2px] rounded-full w-full my-10"></div>
        <div className="flex lg:justify-between justify-center gap-y-4 lg:flex-row flex-col items-center">
          <p className="text-slate-500 text-center">
            Abdul Samad Siddiqui © 2008-2024, All Rights Reserved
          </p>
          <div className="flex gap-x-3">
            {paymentImg.map((item, index) => (
              <div
                className="w-[50px] h-[35px] rounded-lg bg-white flex justify-center items-center"
                key={index}
              >
                <Image
                  src={item.src}
                  alt="img"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Footer;
