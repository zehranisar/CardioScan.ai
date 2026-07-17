const links = [
  "Home",
  "Features",
  "Prediction",
  "AI Assistant",
  "About",
  "Contact",
];

export default function NavLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-8 xl:gap-10">

      {links.map((item) => (

        <a
          key={item}
          href="#"
          className="relative font-medium text-slate-700 transition hover:text-red-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full"
        >
          {item}
        </a>

      ))}

    </nav>
  );
}