import { useFormData } from './formDataStore';
import update from 'immutability-helper';
import { findPath } from '../../util/findPath';
import { IDragControlSource } from '../../example/dnd/practice/Control';
import { IDragColumnSource } from '../../example/dnd/practice/Column';
import { IDragRowSource } from '../../example/dnd/practice/Row';
import { IDragSectionSource } from '../../example/dnd/practice/Section';

export const dispatchControlMove = (
  draggingItem: IDragControlSource,
  hoveringItem: IDragControlSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    if (draggingPath[0] !== hoveringPath[0]) {
      console.log('둘이 다른 부모 섹션을 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: {
                    [draggingPath[2]]: {
                      controls: {
                        $splice: [[draggingItem.index, 1]]
                      }
                    }
                  }
                }
              }
            },
            [hoveringPath[0]]: {
              rows: {
                [hoveringPath[1]]: {
                  columns: {
                    [hoveringPath[2]]: {
                      controls: {
                        $splice: [[hoveringItem.index, 0, draggingItem.id]]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    } else if (draggingPath[1] !== hoveringPath[1]) {
      console.log('둘이 다른 부모 로우를 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: {
                    [draggingPath[2]]: {
                      controls: {
                        $splice: [[draggingItem.index, 1]]
                      }
                    }
                  }
                },
                [hoveringPath[1]]: {
                  columns: {
                    [hoveringPath[2]]: {
                      controls: {
                        $splice: [[hoveringItem.index, 0, draggingItem.id]]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    } else if (draggingPath[2] !== hoveringPath[2]) {
      console.log('둘이 다른 부모 컬럼을 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: {
                    [draggingPath[2]]: {
                      controls: {
                        $splice: [[draggingItem.index, 1]]
                      }
                    },
                    [hoveringPath[2]]: {
                      controls: {
                        $splice: [[hoveringItem.index, 0, draggingItem.id]]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    } else {
      console.log('둘이 같은 부모 컬럼을 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: {
                    [draggingPath[2]]: {
                      controls: {
                        $splice: [
                          [draggingItem.index, 1],
                          [hoveringItem.index, 0, draggingItem.id]
                        ]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    }
  });
};

export const dispatchColumnMove = (
  draggingItem: IDragColumnSource,
  hoveringItem: IDragColumnSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingColumn =
      prevState.form.sections[draggingPath[0]].rows[draggingPath[1]].columns[
        draggingPath[2]
      ];

    if (draggingPath[0] !== hoveringPath[0]) {
      console.log('둘이 다른 부모 섹션을 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: { $splice: [[draggingItem.index, 1]] }
                }
              }
            },
            [hoveringPath[0]]: {
              rows: {
                [hoveringPath[1]]: {
                  columns: {
                    $splice: [[hoveringItem.index, 0, draggingColumn]]
                  }
                }
              }
            }
          }
        }
      });
    } else if (draggingPath[1] !== hoveringPath[1]) {
      console.log('둘이 다른 부모 로우를 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: {
                    $splice: [[draggingItem.index, 1]]
                  }
                },
                [hoveringPath[1]]: {
                  columns: {
                    $splice: [[hoveringItem.index, 0, draggingColumn]]
                  }
                }
              }
            }
          }
        }
      });
    } else {
      console.log('둘이 같은 부모 로우를 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                [draggingPath[1]]: {
                  columns: {
                    $splice: [
                      [draggingItem.index, 1],
                      [hoveringItem.index, 0, draggingColumn]
                    ]
                  }
                }
              }
            }
          }
        }
      });
    }
  });
};

export const dispatchRowMove = (
  draggingItem: IDragRowSource,
  hoveringItem: IDragRowSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingRow =
      prevState.form.sections[draggingPath[0]].rows[draggingPath[1]];

    console.log('draggingRow:', draggingRow);

    if (draggingPath[0] !== hoveringPath[0]) {
      console.log('둘이 다른 부모 섹션을 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                $splice: [[draggingItem.index, 1]]
              }
            },
            [hoveringPath[0]]: {
              rows: {
                $splice: [[hoveringItem.index, 0, draggingRow]]
              }
            }
          }
        }
      });
    } else {
      console.log('둘이 같은 부모 섹션을 가짐');
      return update(prevState, {
        form: {
          sections: {
            [draggingPath[0]]: {
              rows: {
                $splice: [
                  [draggingItem.index, 1],
                  [hoveringItem.index, 0, draggingRow]
                ]
              }
            }
          }
        }
      });
    }
  });
};

export const dispatchSectionMove = (
  draggingItem: IDragSectionSource,
  hoveringItem: IDragSectionSource
) => {
  useFormData.setState((prevState) => {
    const draggingPath = findPath(prevState.form.sections, draggingItem.id);
    const hoveringPath = findPath(prevState.form.sections, hoveringItem.id);

    console.log('draggingPath:', draggingPath);
    console.log('hoveringPath:', hoveringPath);

    const draggingSection = prevState.form.sections[draggingPath[0]];

    console.log('draggingRow:', draggingSection);

    return update(prevState, {
      form: {
        sections: {
          $splice: [
            [draggingItem.index, 1],
            [hoveringItem.index, 0, draggingSection]
          ]
        }
      }
    });
  });
};

export const dispatchEmptyColumn = (
  draggingItem: IDragSectionSource,
  hoveringItem: IDragSectionSource
) => {
  return;
};
