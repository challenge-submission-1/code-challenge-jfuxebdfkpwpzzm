// Extending dayjs in Next.js requires this proxy file approach.
// See: https://github.com/iamkun/dayjs/issues/1577#issuecomment-1970938453

import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";

dayjs.extend(isBetweenPlugin);

export default dayjs;
