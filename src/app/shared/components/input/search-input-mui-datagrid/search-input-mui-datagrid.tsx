import { GridLinkOperator } from '@mui/x-data-grid/models/gridFilterItem'
import { GridFilterModel } from '@mui/x-data-grid/models/gridFilterModel'
import { RiSearch2Line } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import { useEffect, useState } from 'react'

function SearchInputMuiDataGrid(props: {
  columnFieldToSearch: string
  columnFieldTypeNumberToSearch?: string
  setFilter: React.Dispatch<React.SetStateAction<GridFilterModel>>
}) {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    requestSearch(searchValue)
  }, [searchValue])

  const requestSearch = (searchedVal: string) => {
    const filterModel: GridFilterModel = {
      items: [],
      linkOperator: GridLinkOperator.Or,
    }
    if (props?.columnFieldTypeNumberToSearch && Number.parseInt(searchedVal)) {
      const filterItem = {
        id: 1,
        columnField: props.columnFieldTypeNumberToSearch,
        operatorValue: 'contains',
        value: searchedVal,
      }
      filterModel.items.push(filterItem)
      props.setFilter(filterModel)
      return
    }
    if (props.columnFieldToSearch) {
      const filterItem = {
        id: 1,
        columnField: props.columnFieldToSearch,
        operatorValue: 'contains',
        value: searchedVal,
      }
      filterModel.items.push(filterItem)
      props.setFilter(filterModel)
    }
  }
  const cancelSearch = () => {
    setSearchValue('')
  }
  return (
    <>
      <div className="al-input-search-wrapper ">
        <input
          className="al-input-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="al-input-search-icon-left ">
          <RiSearch2Line />
        </div>
        <div
          className={
            searchValue
              ? 'al-input-search-icon-right'
              : 'al-input-search-icon-left-disabled'
          }
        >
          <AiOutlineClose onClick={cancelSearch} />
        </div>
      </div>
    </>
  )
}

export default SearchInputMuiDataGrid
