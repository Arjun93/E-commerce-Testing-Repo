import java.io.*;
import java.util.*;

public class CategoryBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("amazon-meta.txt");
      File outputFile = new File("Category.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      HashMap<String,String> categoryNameIdHashMap = new HashMap<String,String>();
      String myKey = null, myValue = null;
      while((currentLine = myBufferedReader.readLine())!=null) {
         
         if(currentLine.contains("|")) {
            StringTokenizer myTokenizer = new StringTokenizer(currentLine,"|");
            while(myTokenizer.hasMoreElements()) {
               String stringToBeEdited = myTokenizer.nextElement().toString();
               if (stringToBeEdited.charAt(0) == '[' ) {
                  continue;
               }
               else {
                  int openingIndex = stringToBeEdited.indexOf('[');
                  if(openingIndex!=-1) {
                     myKey = stringToBeEdited.substring(0,openingIndex);
                     myValue = stringToBeEdited.substring(openingIndex+1,stringToBeEdited.length()-1);
                     if(categoryNameIdHashMap.containsKey(myKey) && categoryNameIdHashMap.containsValue(myValue)) {
                        //System.out.println("Already present!");
                     }
                     else {
                        //System.out.println("New Entry!");
                        categoryNameIdHashMap.put(myKey,myValue);
                        stringToBeWritten = myKey+"\t"+myValue;
                        //System.out.println(stringToBeWritten);
                        myBufferedWriter.write(stringToBeWritten);

                        myBufferedWriter.newLine();
                     }
                  }
               }
                //System.out.println(myKey+"\t"+myValue);
            }
         }
      }


      /*Set categoryNameIdSet = categoryNameIdHashMap.entrySet();
      Iterator i = categoryNameIdSet.iterator();

      while(i.hasNext()) {
         Map.Entry mapEntry = (Map.Entry)i.next();
         stringToBeWritten = mapEntry.getKey()+"\t"+mapEntry.getValue();
         myBufferedWriter.write(stringToBeWritten);
         myBufferedWriter.newLine();
      }*/

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}