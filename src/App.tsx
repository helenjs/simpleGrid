import styles from './Styles.module.css';

import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

import { Block } from './gridInterface';
import { data } from './__mock__/grid.mocks.data';
import { Header } from './components/Header/Header';

export const App = () => {
  const { id } = useParams() as { id: string };
  // State variables
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<Partial<Block>[]>([]);

  // UseEffect hooks
  useEffect(() => {
    getData();
  }, []);

  // API Methods
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGridData();
      getImagesList(data);
    } catch (error) {
      console.error(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }

  //helper functions

  const getGridData = () =>
    new Promise<Block>((res) => setTimeout(() => res(data), 500));

  /**
   * Get all images from the API response
   * @param dataObject <Block>
   **/
  const getImagesList = (dataObject: Block) => {
    const { children} = dataObject;
    if (!children?.length) return;
    const imageList = mapChildrenList(children, []);
    setImageData(imageList);
  }

  /**
   * Recursively map children list to get all images
   * @param items <Block[]>
   * @param list <Partial<Block>[]>
   **/
  const mapChildrenList = (items: Block[], list: Partial<Block>[]) => {
    items.forEach(({id, type, options, children, data}) => {
      if (type === "Image") {
        list.push({
          id,
          options,
          data
        })
      }
      if (type === "Column" && children?.length) {
        mapChildrenList(children, list);
      }
    });
    return list;
  }

  return (
    <>
      <Header />
      <main className={styles.main} data-testid="main">
        <div className={styles.wrapper}>
          { !imageData.length && !isLoading &&
              <div>No data</div>
          }
          { isLoading && <CircularProgress className={styles.loader} data-testid='preloader' /> }
        </div>
      </main>
    </>
  );
};
