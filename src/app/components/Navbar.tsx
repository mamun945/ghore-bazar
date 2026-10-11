import Image from 'next/image';
import logo from '../../../public/logo-icon.png';
import SignInSignUpBtnPage from './SignInSignUpBtn';
import Link from 'next/link';

const NavbarPage = () => {
    const date = new Date();

    const banglaDate = new Intl.DateTimeFormat("bn-BD-u-ca-beng", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Brand Logo & Title */}
                <div >
                  <Link href={'/'} className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20">
                        <Image
                            src={logo}
                            alt="বাজার দর লোগো"
                            height={24}
                            width={24}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                            বাজার <span className="text-emerald-400">দর</span>
                        </h1>
                        <p className="text-xs font-medium text-slate-400">
                            {banglaDate}
                        </p>
                    </div>
                  </Link>
                </div>

                {/* Auth Action Buttons */}
                <div>
                    <SignInSignUpBtnPage></SignInSignUpBtnPage>
                </div>
            </nav>
        </header>
    );
};

export default NavbarPage;