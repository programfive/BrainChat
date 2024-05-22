import { FaSearch } from "react-icons/fa";
import { Input } from "./ui/input";
interface SearchInputProps {
  search: string;
  onSearch: (event: React.FormEvent<HTMLInputElement>) => void;
}
export const SearchInput: React.FC<SearchInputProps> = ({
  search,
  onSearch,
}) => {
  return (
    <div className=" relative mt-6 md:my-2">
      <FaSearch
        size={15}
        className="absolute top-1/2 -translate-y-1/2 ml-2 text-gray-600"
      />
      <Input
        type="search"
        className="pl-8"
        placeholder="Search..."
        value={search}
        onChange={onSearch}
      />
    </div>
  );
};
export const SearchNotFound = () => {
  return (
    <div className="flex flex-col items-center text-lg justify-center gap-8 p-5 text-gray-600">
      <FaSearch size={50} />
      No results found
    </div>
  );
};
