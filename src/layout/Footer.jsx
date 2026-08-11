const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} CRM Application. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-600">
            Privacy
          </a>

          <a href="#" className="hover:text-blue-600">
            Terms
          </a>

          <a href="#" className="hover:text-blue-600">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
