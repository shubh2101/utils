const [activeStep, setActiveStep] = useState(1);
{
  activeStep !== formElements.length && (
    <button
      disabled={activeStep === formElements.length ? 'disabled' : ''}
      onClick={() => setActiveStep((prev) => prev + 1)}
      className={`px-8 gap-2 py-2 flex justify-between items-center rounded-md bg-green-600 text-white ${
        activeStep === formElements.length
          ? 'opacity-50 bg-slate-600'
          : 'opacity-100'
      }`}
    >
      <span className="hidden md:block">Next</span>
      <svg
        className="size-3.5 rtl:rotate-180 md:mb-1"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );
}
