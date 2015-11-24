import java.io.*;
import java.util.*;

public class ProductCategoryBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("amazon-meta.txt");
      File outputFile = new File("ProductCategory.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      LinkedList idLinkedList = new LinkedList();
      LinkedList categoriesLinkedList = new LinkedList();
      LinkedList<String> categoryNameIdLinkedList = new LinkedList<String>();
      HashMap<String,String> idCategoryHashMap = new HashMap<String,String>();
      String currentId="";

      while((currentLine = myBufferedReader.readLine())!=null) {

         
         if(currentLine.contains("Id:")) {
            currentId = currentLine.substring(currentLine.lastIndexOf(" "));
         }

         if(currentLine.contains("|")) {
            StringTokenizer myTokenizer = new StringTokenizer(currentLine,"|");
            String currentIdCategories = "";
            String resultantString = " ";
            while(myTokenizer.hasMoreElements()) {
               currentIdCategories += myTokenizer.nextElement().toString();
            }
            for(int k=0;k<currentIdCategories.length();k++) {
               if(currentIdCategories.charAt(k) == '[') {
                  int count = k+1;
                  while(currentIdCategories.charAt(count) != ']') {
                     resultantString += currentIdCategories.charAt(count);
                     count++;
                  }
                  resultantString += " ";
               }
            }
            String[] categoriesId = resultantString.split(" ");
            for(int i=1;i<categoriesId.length;i++) {
               myBufferedWriter.write(currentId +"\t"+ categoriesId[i]);
               myBufferedWriter.newLine();
            }
         }
      }
      

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}