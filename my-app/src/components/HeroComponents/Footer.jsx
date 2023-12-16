import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../images/logo0.png";

const Footer = () => {
    return (
        <footer class="bg-white">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <a href="https://venatic.me/" class="flex items-center">
                            <img src={logoImage} class="h-8 me-3" alt="FlowBite Logo" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap text-black">Venatic</span>
                        </a>
                    </div>
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-black uppercase">Legal</h2>
                            <ul class="text-black font-medium">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-6 border-black sm:mx-auto lg:my-8" />
                <div class="sm:flex sm:items-center sm:justify-between">
                    <span class="text-sm text-black sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline">Venatic</a>. All Rights Reserved.</span>
                    <div class="flex mt-4 sm:justify-center sm:mt-0">
                        {/* Social icons */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
