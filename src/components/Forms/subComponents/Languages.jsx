import LanguageRow from "./LanguageRow";

const Languages = ({
  languages,
  handleAddLanguage,
  handleDeleteLanguage,
  handleLanguageChange,
}) => {
  //   const EMTPY_LANG = {
  //     id: Date.now(),
  //     language: "",
  //     level: "",
  //   };

  //   const [languages, setLanguages] = useState(
  //     languageData.length
  //       ? languageData.map((l, index) => (l.id ? { ...l, id: index } : l))
  //       : [EMTPY_LANG]
  //   );

  return (
    <div>
      <p className="text-center text-sm mb-8 text-dark-purple">
        Add any languages you speak, and your level.
      </p>
      {languages.map((lang) => (
        <LanguageRow
          key={lang.id}
          formData={lang}
          onChange={(field, value) =>
            handleLanguageChange(lang.id, field, value)
          }
          onDelete={() => handleDeleteLanguage(lang.id)}
        />
      ))}

      <div className="lg:col-span-4 flex md:col-span-2 sm:col-span-1 xs:col-span-1 mc:col-span-1 flex justify-center mt-4">
        <button
          type="button"
          onClick={handleAddLanguage}
          className="text-light-purple border-pale-purple border-2 rounded-2xl px-3 py-2 hover:bg-pale-purple"
        >
          Add Language
        </button>
      </div>
    </div>
  );
};

export default Languages;
