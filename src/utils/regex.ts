export const emailPattern =
  /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
export const passwordPattern =
  /^(?!.*\..*[@])[A-Za-z!@#$%^&*()_+{}[\]:;<>,.?~\\-]{6,}$/;
export const namePattern =
  /^[\p{L}'.,\-ÁáÉéÍíÓóÚúÄäËëÏïÖöÜüÀàÂâÃãÅåĄąĆćČčĖėĘęÈèÊêÌìÍíÎîÏïĮįŁłŃńÒòÓóÔôÖöÕõØøÙùÚúÛûÜüŲųŪūŸÿÝýŻżŹźÑñÇçČčŠšŽžÀÁÂÂÄÄÃÃÅÅĄĄĆĆČČĖĖÊÊËËÈÈÍÍÎÎÏÏĮĮŁŁŃŃÒÒÓÓÔÔÖÖÕÕØØÙÙÚÚÛÛÜÜŲŲŪŪŸŸÝÝŻŻŹŹßÇçŒŒÆÆČČŠŠŽŽñÑâêÁÉíóú都道府県Федерацииআবাসযোগ্য\s.-]*$/u;

export const officerEmailPattern = /^[a-zA-Z0-9._%+-]+@saps\.gov\.za$/;

export const idPattern = /^SAPS\d{6}$/;
