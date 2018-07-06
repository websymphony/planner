import { navigate } from "@reach/router";
import Downshift from "downshift";
import { observer } from "mobx-react";
import React, { Component } from "react";
import * as Rebass from "rebass";

class Search extends Component {
  onSearchSelection = selection => {
    navigate(`/${selection.date}?selectedItemId=${selection._id}`);
  };

  render() {
    const { todoStore, noteStore } = this.props;
    let searchItems = todoStore.todosWithDates.concat(noteStore.notesWithDates);
    return (
      <Downshift
        onChange={selection => this.onSearchSelection(selection)}
        itemToString={item => ""}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <Rebass.Input
              {...getInputProps()}
              type="search"
              borderColor="black"
              bg="white"
              borderRadius={0}
              placeholder="Search..."
              boxShadow={0}
            />
            <dl {...getMenuProps()} className="searchDropdownContainer">
              {isOpen
                ? searchItems
                    .filter(
                      item =>
                        !inputValue ||
                        item.content
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <dt
                        className="searchResult"
                        {...getItemProps({
                          key: item._id,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? "lightgray" : "white"
                          }
                        })}
                      >
                        <Rebass.Text children={item.date} fontSize={2} />
                        {item.content}
                      </dt>
                    ))
                : null}
            </dl>
          </div>
        )}
      </Downshift>
    );
  }
}

export default observer(Search);
