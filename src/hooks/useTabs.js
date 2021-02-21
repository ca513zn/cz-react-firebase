import { useContext } from 'react';
import TabsContext from '../contexts/TabsContext';

const useTabs = () => useContext(TabsContext);

export default useTabs;
