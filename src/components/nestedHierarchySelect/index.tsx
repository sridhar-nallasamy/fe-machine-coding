import { useState } from 'react';

import hierarchyData, { type HierarchyDataProps } from './data';
import styles from './styles.module.css';

const ListItem: React.FC<{
  datum: HierarchyDataProps;
  handleChange: (node: HierarchyDataProps) => void;
}> = ({ datum, handleChange }) => {
  return (
    <li>
      <div
        className={styles.ipBox}
        onClick={() => {
          handleChange(datum);
        }}
      >
        <input type='checkbox' checked={datum.value} readOnly />
        <p className={styles.ipLabel}>{datum.name}</p>
      </div>
      {datum.children.map((child) => (
        <ul key={child.id}>
          <ListItem {...{ datum: child, handleChange }} />
        </ul>
      ))}
    </li>
  );
};

const NestedHierarchySelect = () => {
  const [data, setData] = useState(hierarchyData);

  const updateSelection = (
    nodes: HierarchyDataProps[],
  ): HierarchyDataProps[] => {
    return nodes.map((node) => {
      const children = updateSelection(node.children);
      const isAllSelected = !children.filter((child) => !child.value).length;
      return {
        ...node,
        value: children.length ? isAllSelected : node.value,
        children,
      };
    });
  };

  const findNodeAndUpdate = (
    nodes: HierarchyDataProps[],
    id: number,
    value: boolean,
    parentValue: null | boolean,
  ): HierarchyDataProps[] => {
    return nodes.map((node) => {
      const isMatch = node.id === id;

      const childNodes = findNodeAndUpdate(
        node.children,
        id,
        value,
        isMatch ? value : parentValue,
      );

      if (isMatch) {
        return {
          ...node,
          value,
          children: childNodes,
        };
      }

      return {
        ...node,
        value: parentValue ?? node.value,
        children: childNodes,
      };
    });
  };

  const handleChange = (node: HierarchyDataProps) => {
    setData(() => {
      const updatedNodeAndChildren = findNodeAndUpdate(
        data,
        node.id,
        !node.value,
        null,
      );
      const updatedAll = updateSelection(updatedNodeAndChildren);
      return updatedAll;
    });
  };

  return (
    <div className={styles.container}>
      {data.map((datum) => (
        <ul key={datum.id}>
          <ListItem {...{ datum, handleChange }} />
        </ul>
      ))}
    </div>
  );
};

export default NestedHierarchySelect;
