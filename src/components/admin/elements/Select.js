import { useEffect, useRef, useState } from 'react';

const Icon = () => {
  return (
    <svg className="stroke-black h-[1.6rem] w-[1.6rem] fill-none">
      <use href={`/images/sprite.svg#icon-chevron`} />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg className="h-[1.6rem] w-[1.6rem] fill-none stroke-red-600">
      <use href={`/images/sprite.svg#icon-close`} />
    </svg>
  );
};

const Select = ({ placeHolder, options, isMulti, isSearchable, onChange, label }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    // const handler = () => setShowMenu(false);
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="flex gap-x-[1.6rem]">
          {selectedValue.map((option) => (
            <div key={option.value} className="capitalize flex items-center h-full gap-x-[.8rem]">
              {option.label}
              <span onClick={(e) => onTagRemove(e, option)} className="capitalize">
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };

  return (
    <div className="w-full">
      <label className="text-black/70">{label}</label>
      <div className={`w-full border-[.16rem] border-black/10 outline-none rounded-[.4rem] mt-[.8rem]`}>
        <div
          onClick={handleInputClick}
          className="flex justify-between items-center h-[4.8rem] px-[1.6rem] text-[1.6rem] cursor-pointer text-black/70 capitalize"
        >
          <div>{getDisplay()}</div>
          <div>
            <div className={showMenu ? 'rotate-180' : ''}>
              <Icon />
            </div>
          </div>
        </div>
        {showMenu && (
          <div className="bg-white text-black">
            {isSearchable && (
              <div className="">
                <input onChange={onSearch} value={searchValue} ref={searchRef} />
              </div>
            )}
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`px-[1.6rem] py-[.8rem] capitalize text-[1.6rem] cursor-pointer border-t-[.16rem] border-black/10 bg-black/[.03]`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
