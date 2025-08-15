export class ObjectLib {
  static keys = <T extends Record<string, unknown>>(data: T): [keyof T] => {
    return Object.keys(data) as [keyof T];
  };

  static cleanObject = <T extends Record<string, unknown>>(data: T): T => {
    const newData = { ...data };

    for (const [key, val] of Object.entries(newData)) {
      if (val === "" || val === null || val === undefined) {
        delete newData[key];
      }
    }

    return newData;
  };
}
